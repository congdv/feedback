const paths = {
  home() {
    return '/';
  },
  roadmap() {
    return '/roadmap'
  },
  settings() {
    return "/settings";
  },
  topicShow(tagSlug: string) {
    return `/tags/${tagSlug}`;
  },

  postCreate(tagSlug: string) {
    return `/tags/${tagSlug}/posts/new`;
  },

  postShow(postId: string) {
    return `/posts/${postId}`;
  }
}

export default paths;