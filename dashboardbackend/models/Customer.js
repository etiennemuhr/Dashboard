const mongoose = require("mongoose");
const slugify = require("slugify");

const CustomerSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please add a company name"]
    },
    slug: String,
    zipCode: {
      type: String,
      required: [true, "Please add a zipcode"]
    },
    city: {
      type: String,
      required: [true, "Please add a city"]
    },
    street: {
      type: String,
      required: [true, "Please add a street"]
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"]
    },
    contactPerson: {
      type: String,
      required: [true, "Please add a contact person"]
    },
    revenue: {
      type: String,
      default: 0
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "please add a valid URL with http or https"
      ]
    },
    description: {
      type: String
    },
    country: {
      type: String,
      required: [true, "Please add a country"]
    },
    email: {
      type: String,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please add a valid URL with http or https"
      ]
    },
    zipCodeDelivery: {
      type: String
    },
    cityDelivery: {
      type: String
    },
    streetDelivery: {
      type: String
    },
    countryDelivery: {
      type: String
    },
    linkTo: {
      type: String,
      required: [true, "Please add a link to"]
    }
  },
  { timestamps: true }
);

// Create customer slug from company name

CustomerSchema.pre("save", function(next) {
  this.slug = slugify(this.company);
  next();
});

module.exports = mongoose.model("Customer", CustomerSchema);
