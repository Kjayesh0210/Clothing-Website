import {
  Truck,
  ShieldCheck,
  RefreshCw,
  Award,
  Headphones,
  BadgeCheck,
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
      title: "Pay Securely",
      description: "100% secure checkout with Razorpay.",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "Simple 7-day returns and exchanges.",
    },
    {
      icon: Award,
      title: "Quality First",
      description: "Carefully selected fabrics with lasting comfort.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Friendly customer support whenever you need help.",
    },
    {
      icon: BadgeCheck,
      title: "Authentic Products",
      description: "100% genuine products with guaranteed quality.",
    },
  ];

  return (
    <section className="bg-[#F8F8F8] py-8 lg:py-8">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-[80px]">
        {/* Heading */}

        <div className="mb-12 text-center lg:mb-16">
          <h2 className="text-3xl font-black uppercase tracking-tight text-[#000000] sm:text-4xl lg:text-[44px]">
            Why Choose Us
          </h2>

          <p className="mt-4 text-base text-neutral-500 sm:text-lg">
            Everything you need for a seamless shopping experience.
          </p>
        </div>

        {/* Features */}

        <div className="mx-auto grid w-full grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-[20px]
        bg-white
        p-4
        text-center
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
        lg:p-10
        ${index >= 4 ? "hidden lg:flex" : "flex"}
      `}
              >
                <div
                  className="
          flex
          h-12
          w-12
          lg:h-16
          lg:w-16
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
                  <Icon size={20} className="lg:h-[30px] lg:w-[30px]" />
                </div>

                <h3 className="mt-4 text-sm font-bold text-neutral-900 lg:mt-6 lg:text-2xl">
                  {feature.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-neutral-500 lg:mt-3 lg:max-w-[260px] lg:text-base lg:leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
