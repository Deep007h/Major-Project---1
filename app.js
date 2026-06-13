const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const catchAsync = require("./utils/catchAsync.js");
const ExpressError = require("./utils/ExpressError.js");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderland";
const PORT = process.env.PORT || 8080;

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "wanderland_dev_secret_change_in_production",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

// Root route - redirect to listings
app.get("/", (req, res) => {
    res.redirect("/listings");
});

// Listings index - show all listings
app.get("/listings", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.render("./listings/index.ejs", { allListings });
    } catch (err) {
        req.flash("error", "Failed to fetch listings");
        res.redirect("/");
    }
});

// New listing form
app.get("/listings/new", (req, res) => {
    res.render("./listings/new.ejs");
});

// Create listing
app.post("/listings", catchAsync(async (req, res) => {
    if (!req.body.listing) {
        throw new ExpressError(400, "Invalid listing data");
    }
    if (!req.body.listing.title || !req.body.listing.price || !req.body.listing.location || !req.body.listing.country) {
        req.flash("error", "Please fill in all required fields (title, price, location, country)");
        return res.redirect("/listings/new");
    }
    // Ensure price is a positive number
    if (Number(req.body.listing.price) < 0) {
        req.flash("error", "Price must be a positive number");
        return res.redirect("/listings/new");
    }

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New listing created successfully!");
    res.redirect("/listings");
}));

// Edit listing form
app.get("/listings/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { listing });
}));

// Show listing details
app.get("/listings/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });
}));

// Update listing
app.put("/listings/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    if (!req.body.listing) {
        throw new ExpressError(400, "Invalid update data");
    }
    // Ensure price is a positive number if provided
    if (req.body.listing.price && Number(req.body.listing.price) < 0) {
        req.flash("error", "Price must be a positive number");
        return res.redirect(`/listings/${id}/edit`);
    }

    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true, new: true });
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
}));

// Delete listing
app.delete("/listings/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
}));

// 404 handler - catch-all for unknown routes
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Central error handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("listings/error.ejs", { err });
});

// Connect to DB then start server
async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

main().catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
    process.exit(1);
});
