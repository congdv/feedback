const paths = {
  home() {
    return '/';
  },
  roadmap() {
    return '/roadmap'
  },
  topicShow(tagSlug: string) {
    return `/tags/${tagSlug}`;
  },

  postCreate(tagSlug: string) {
    return `/tags/${tagSlug}/posts/new`;
  },

  postShow(tagSlug: string, postId: string) {
    return `/tags/${tagSlug}/posts/${postId}`;
  }
}

export default paths;