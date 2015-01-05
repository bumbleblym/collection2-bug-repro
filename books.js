Books = new Mongo.Collection("books");

var Schemas = {};

Schemas.Book = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    author: {
        type: String,
        label: "Author"
    },
    copies: {
        type: Number,
        label: "Number of copies",
        min: 0
    },
    lastCheckedOut: {
        type: Date,
        label: "Last date this book was checked out",
        optional: true
    },
    summary: {
        type: String,
        label: "Brief summary",
        optional: true,
        max: 1000
    },
    borrowedBy: {
        type: [Object]
    },
    "borrowedBy.$.name": {
        type: String
    },
    "borrowedBy.$.email": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    }
});

Books.attachSchema(Schemas.Book);

Meteor.startup(function() {
    if (Meteor.isServer) {
        Books.remove({});

        var bookId = Books.insert({
            title: "Ulysses",
            author: "James Joyce",
            copies: 1,
            borrowedBy: [{
                name: "James Joyce",
                email: "james@joyce"
            }]
        });

        console.log(Books.findOne());

        Books.update(bookId, {
            $set: {
                "borrowedBy.1.name": "No email field"
            }
        });

        console.log(Books.findOne());
    }
});
