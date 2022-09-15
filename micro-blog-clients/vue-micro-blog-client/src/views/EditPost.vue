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
        v-model="Post.title"
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
        v-model="Post.author"
      />
    </div>
    <br />
    <div>
      <strong>Description</strong>
    </div>
    <div>
      <textarea
        class="w-full p-2 h-48 rounded-md"
        name="description"
        v-model="Post.description"
      ></textarea>
    </div>
    <br />
    <div class="grid gap-3 grid-flow-col md:w-1/3">
      <button
        class="bg-green-300 text-white font-semibold text-md px-4 py-2 rounded-md"
        @click="
          updatePost(Post.title, Post.description, Post.author, Post.createDate)
        "
      >
        Save
      </button>
      <button
        class="bg-red-300 text-white font-semibold text-md px-4 py-2 rounded-md"
        @click="deletePost(Post.id)"
      >
        Delete
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
import gql from "graphql-tag";

const GET_POST_BY_ID = gql`
  query Post($id: ID!) {
    Post(id: $id) {
      id
      title
      description
      createDate
      author
    }
  }
`;

let GET_POSTS = gql`
  query {
    Posts {
      id
      title
      description
      createDate
      author
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePost(
    $id: ID!
    $title: String!
    $description: String!
    $author: String!
    $createDate: String!
  ) {
    updatePost(
      id: $id
      title: $title
      description: $description
      author: $author
      createDate: $createDate
    )
  }
`;

export default {
  name: "EditPost",
  data() {
    return {
      Post: {
        id: null,
        title: "",
        description: "",
        author: "",
        createDate: ""
      },
      message: ""
    };
  },
  methods: {
    updatePost(title, description, author, createDate) {
      this.$apollo
        .mutate({
          mutation: UPDATE_POST,
          variables: {
            id: this.Post.id,
            title: title,
            description: description,
            author: author,
            createDate: createDate
          }
        })
        .then(() => {
          this.message = "Post updated successfully";
        })
        .catch(() => {
          this.message = "Error updating post";
        });
    },
    deletePost(id) {
      this.$apollo.mutate({
        mutation: gql`
          mutation deletePost($id: ID!) {
            deletePost(id: $id)
          }
        `,
        variables: {
          id: id.toString()
        },
        update: cache => {
          // update post list
          const data = cache.readQuery({ query: GET_POSTS });
          this.Posts = data.Posts.filter(post => post.id !== id);
          this.back();
        }
      });
    },
    getPostById() {
      this.$apollo
        .query({
          query: GET_POST_BY_ID,
          variables: {
            id: this.$route.params.id
          }
        })
        .then(response => {
          this.Post = response.data.Post;
        });
    },
    back() {
      this.$router.back()
    }
  },
  mounted() {
    this.getPostById();
  }
};
</script>

<style scoped></style>
