{
    $id: "https://example.com/person.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Person",
    type: "object",
    properties: {
      firstName: {
        type: "string",
        title: "First Name",
        description: "The person's first name.",
        example: "John"
      },
      lastName: {
        type: "string",
        title: "Last Name",
        description: "The person's last name.",
        example: "Doe"
      },
      nickNames: {
        type: "array",
        title: "Nicknames",
        items: {
          type: "string",
          example: "j-dough"
        }
      },
      age: {
        title: "Age",
        description:
          "Age in years which must be equal to or greater than zero.",
        type: "integer",
        minimum: 0
      }
    },
    required: ["firstName"]
  }
