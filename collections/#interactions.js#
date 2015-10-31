Interactions = new Mongo.Collection('interactions');

// Define the Video schema
InteractionSchema = new SimpleSchema({
  title: {
      type: String,
      label: "Title",
      max: 200
  },
   desc: {
       type: String,
       label: "Description"
    },
  userId: {
      type: String,
      label: "UserId",

  },
  copies: {
      type: Number,
      label: "Number of copies",
      min: 0
  },
    hasHands: {
        type: Boolean,
        label: "Does this video use hands",
        optional: false
    }
});

Interactions.attachSchema( InteractionSchema );
