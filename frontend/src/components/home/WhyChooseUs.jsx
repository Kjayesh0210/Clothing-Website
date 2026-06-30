import {
  Truck,
  ShieldCheck,
  RefreshCw,
  Headset,
  Award,
  Sparkles,
} from "lucide-react";

function WhyChooseUs() {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on all orders across India.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "100% secure checkout with Razorpay.",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "Simple 7-day returns and exchanges.",
    },
    {
      icon: Headset,
      title: "24/7 Support",
      description: "Dedicated customer support whenever you need us.",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Carefully selected fabrics with lasting comfort.",
    },
    {
      icon: Sparkles,
      title: "Latest Trends",
      description: "Fresh arrivals inspired by modern streetwear.",
    },
  ];

  return (
    <section className="bg-[#F8F8F8] py-24">
      <div className="mx-auto w-full px-[80px]">
        {/* Heading */}

        <div className="mb-16 text-center">
          <h2 className="text-[44px] font-black uppercase tracking-tight text-[#000000]">
            Why Choose Us
          </h2>

          <p className="mt-4 text-lg text-neutral-500">
            Everything you need for a seamless shopping experience.
          </p>
        </div>
        <div className="h-6"></div>

        {/* Features */}
        <div className="flex">
          <div className="w-26"></div>
          <div className="mx-auto grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="
              group
              flex
              flex-col
              items-center
              justify-center
              rounded-[24px]
              bg-white
              p-10
              text-center
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-xl
              "
                >
                  <div
                    className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-neutral-100
                  transition
                  duration-300
                  group-hover:bg-black
                  group-hover:text-white
                  "
                  >
                    <Icon size={30} />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-neutral-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 max-w-[260px] text-base leading-7 text-neutral-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="w-26"></div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
