'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please provide product title',
    trim: true
  },
  comments: {
    type: String,
    default: '',
    trim: true
  },
  color: {
    type: String,
    default: '',
    required: 'Please use a proper hex code',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  material: {
    type: String,
    default: '',
    required: 'Please provide a material',
    trim: true
  },
  materials: {
    type: [],
    default: [],
    required: 'Please provide a material',
    trim: true
  }


});

mongoose.model('Product', ProductSchema);
