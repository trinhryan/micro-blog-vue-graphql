<template>
  <div class="md:w-1/3 m-auto w-4/5">
    <div class="">
      <strong>Title</strong>
    </div>
    <div>
      <input
        class="w-full p-2 rounded-md"
        type="text"
        id="title"
        name="title"
        value=""
        v-model="title"
      />
    </div>
    <br />
    <div>
      <strong>Author</strong>
    </div>
    <div>
      <input
        class="w-full p-2 rounded-md"
        type="text"
        name="author"
        v-model="author"
      />
    </div>
    <br />
    <div>
      <strong>Description</strong>
    </div>
    <div>
      <textarea
        class="w-full p-2 rounded-md"
        name="description"
        v-model="description"
      ></textarea>
    </div>
    <br />
    <div class="grid gap-3 grid-flow-col md:w-1/3">
      <button
        class="bg-green-300 text-white font-semibold text-md px-4 py-2 rounded-md"
        @click="createPost(title, description, author, createDate)"
      >
        Save
      </button>
      <button
        class="bg-red-300 text-white font-semibold text-md px-4 py-2 rounded-md"
        @click="clean()"
      >
        Clear
      </button>
      <button
        class="bg-blue-300 text-white font-semibold text-md px-4 py-2 rounded-md"
        @click="back()"
      >
        Back
      </button>
    </div>
    <br />
    <!--    make a message notify when the post is created-->
    <div
      v-if="message"
      class="bg-green-50 text-green-400 font-md text-md px-4 py-2 rounded-md"
    >
      {{ message }}
    </div>
  </div>
</template>
<script>
//tag of graphql to make new queries and mutations
import gql from "graphql-tag";
//we are using moment to format date
import moment from "moment";

export default {
  name: "AddPost",
  data() {
    return {
      id: null,
      title: "",
      description: "",
      author: "",
      createDate: "",

      message: ""
    };
  },
  methods: {
    //method to call by save button to add new post
    createPost(title, description, author, createDate) {
      createDate = moment(new Date()).format("DD-MM-YYYY");
      //call object apollo to mutate the mutation createPost defined in the graphql api
      this.$apollo.mutate({
        mutation: gql`
          mutation createPost(
            $title: String!
            $description: String!
            $createDate: String!
            $author: String!
          ) {
            createPost(
              title: $title
              description: $description
              createDate: $createDate
              author: $author
            ) {
              id
              title
              description
              createDate
              author
            }
          }
        `,
        variables: {
          title: title,
          description: description,
          createDate: createDate,
          author: author
        }
      });
      this.clean();
      this.message = "Post created successfully";
      // set timeout to hide the message
      setTimeout(() => {
        this.message = "";
      }, 3000);
    },
    clean() {
      this.title = "";
      this.description = "";
      this.createdDate = "";
      this.author = "";
      this.createDate = "";
    },
    back() {
      this.$router.back();
    }
  }
};
</script>
