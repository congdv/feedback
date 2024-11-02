import Header from "@/components/app/header";

export default async function OrganizationLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  return (
    <div>
      <Header organizationSlug={slug} />
      {children}
    </div>
  );
}
