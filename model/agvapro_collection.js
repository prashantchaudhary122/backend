
        const mongoose = require('mongoose');
        const device = require('./device')
        const logs = require('./logs')
              
              const schemaOptions = {
                  timestamps: true,
                  toJSON: {
                      virtuals: false
                  },
                  toObject: {
                      virtuals: false
                  }
              }
              
              const agvapro_collectionSchema = new mongoose.Schema(
                  {
                    version: {
                      type: String,
                      required: [true, 'Log version is required.']
                  },
                  type: {
                    type: String,
                    enum: ["001","002","003","004"],
                    required: [true, "Atleast one model required."]
                  },
                  device:{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
                  log:logs
                  },
                  schemaOptions
                  )
  
                  agvapro_collectionSchema.index({'type': 1})
                  
                  const agvapro_collection = mongoose.model('agvapro_collection', agvapro_collectionSchema)
                  
                  module.exports = agvapro_collection
                  