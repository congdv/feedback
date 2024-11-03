import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const features = [
  {
    title: "Customizable Organizations",
    description: "Create and organize your own workspace tailored to your team's needs.",
  },
  {
    title: "Feature Popularity Insights",
    description: "Easily track and prioritize the features your users want the most.",
  },
  {
    title: "Customer Feedback and Feature Requests",
    description: "Empower users to request new features and give feedback, helping you stay aligned with their needs.",
  }
];

export const LandingFeature = () => {


  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-[#192339] border-none text-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

