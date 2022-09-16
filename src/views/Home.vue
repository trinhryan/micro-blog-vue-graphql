<template>
  <div class="grid grip-flow-col gap-5 md:w-2/5 m-auto my-5">
    <div
        v-for="post in Posts"
        :key="post.id"
        class="relative rounded-md bg-white p-5 mx-5 cursor-pointer hover:text-green-400 hover:-translate-x-2 hover:transition-all transition duration-300 ease-in-out"
    >
      <div class="font-bold" @click="editPost(post.id)">{{ post.title }}</div>
      <div class="overflow-hidden max-h-48" @click="editPost(post.id)">
        <p>
          {{ post.description }}
        </p>
      </div>
      <div class="grid grid-flow-col text-sm text-slate-300">
        <div class="text-left">
          {{ post.author }}
        </div>
        <div class="text-right">
          {{ formatDate(post.createDate) }}
        </div>
      </div>
      <div
          class="absolute top-0 right-0 p-5 hover:text-red-500"
          @click="deletePost(post.id)"
      >
        <i class="ri-delete-bin-6-line"></i>
      </div>
    </div>
  </div>
</template>

<script>
//tag of graphql to make new queries and mutations
import gql from "graphql-tag";
//we are using moment to format date
import moment from "moment";

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

export default {
  name: "home",
  data() {
    return {
      Posts: []
    };
  },

  methods: {
    //method to format date
    formatDate: function (date) {
      return moment(date, "DD-MM-YYYY").format("MMM/DD/YYYY");
    },
    //method to edit post
    editPost(id) {
      this.$router.push({name: "editpost", params: {id: id}});
    },
    //method to delete post
    async deletePost(id) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation deletePost($id: ID!) {
            deletePost(id: $id)
          }
        `,
        variables: {
          id: id.toString()
        },
        update: () => {
          // update post list
          this.Posts = this.Posts.filter(post => post.id !== id);
        }
      });
    },
    async getPosts() {
      await this.$apollo
          .query({
            query: GET_POSTS
          })
          .then(result => {
            this.Posts = result.data.Posts;
          });
    }
  },
  mounted() {
    this.getPosts();
  }
};
</script>
