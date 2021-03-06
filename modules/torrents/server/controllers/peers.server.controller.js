'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  config = require(path.resolve('./config/config')),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  User = mongoose.model('User'),
  Peer = mongoose.model('Peer'),
  Torrent = mongoose.model('Torrent'),
  async = require('async'),
  validator = require('validator'),
  tmdb = require('moviedb')(config.meanTorrentConfig.tmdbConfig.key);

const PEERSTATE_SEEDER = 'seeder';
const PEERSTATE_LEECHER = 'leecher';

/**
 * list my seeding torrents
 * @param req
 * @param res
 */
exports.getMySeeding = function (req, res) {
  Peer.find({
    user: req.user._id,
    peer_status: PEERSTATE_SEEDER
  }).sort('-peer_uploaded')
    .populate({
      path: 'torrent',
      populate: {
        path: 'user',
        select: 'displayName profileImageURL'
      }
    })
    .exec(function (err, torrents) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(torrents);
      }
    });
};

/**
 * list my downloading torrents
 * @param req
 * @param res
 */
exports.getMyDownloading = function (req, res) {
  Peer.find({
    user: req.user._id,
    peer_status: PEERSTATE_LEECHER
  }).sort('-peer_downloaded')
    .populate({
      path: 'torrent',
      populate: {
        path: 'user',
        select: 'displayName profileImageURL'
      }
    })
    .exec(function (err, torrents) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(torrents);
      }
    });
};

/**
 * list user seeding torrents
 * @param req
 * @param res
 */
exports.getUserSeeding = function (req, res) {
  Peer.find({
    user: req.model._id,
    peer_status: PEERSTATE_SEEDER
  }).sort('-peer_uploaded')
    .populate({
      path: 'torrent',
      populate: {
        path: 'user',
        select: 'displayName profileImageURL'
      }
    })
    .exec(function (err, torrents) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(torrents);
      }
    });
};

/**
 * list user downloading torrents
 * @param req
 * @param res
 */
exports.getUserDownloading = function (req, res) {
  Peer.find({
    user: req.model._id,
    peer_status: PEERSTATE_LEECHER
  }).sort('-peer_downloaded')
    .populate({
      path: 'torrent',
      populate: {
        path: 'user',
        select: 'displayName profileImageURL'
      }
    })
    .exec(function (err, torrents) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(torrents);
      }
    });
};
