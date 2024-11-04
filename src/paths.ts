const paths = {
  home() {
    return "/";
  },
  landingDashboard() {
    return "/dashboard";
  },
  roadmap(slug: string) {
    return this.organizationShow(slug) + "/roadmap";
  },
  settings(slug: string) {
    return this.organizationShow(slug) + "/settings";
  },
  dashboard(slug: string) {
    return this.organizationShow(slug) + "/dashboard";
  },
  topicShow(tagSlug: string) {
    return `/tags/${tagSlug}`;
  },

  postCreate(tagSlug: string) {
    return `/tags/${tagSlug}/posts/new`;
  },

  postShow(organization: string, postId: string) {
    return `/organization/${organization}/posts/${postId}`;
  },
  organizationShow(slug: string) {
    return `/organization/${slug}`;
  },
};

export default paths;
