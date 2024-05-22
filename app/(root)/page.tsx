import { getUserSession } from "@/app/actions";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Container from "@/components/shared/global-container";
import RedirectButton from "@/components/shared/redirect-button";

interface HomePageProps {}

const HomePage = async ({}: HomePageProps) => {
  const user = await getUserSession();

  if (user && !user?.collegeName) {
    return redirect("/college-name");
  }

  if (user && !user?.houseName) {
    return redirect("/house-name");
  }

  return (
    <section className="mt-16 sm:mt-36 ">
      <Container className="flex justify-center items-center flex-col ">
        <Button
          asChild
          className="rounded-full border hover:bg-background  shadow-black/10 shadow-md"
          variant="ghost"
        >
          <span className=""> Rate Food in Public!</span>
        </Button>

        <p className="mt-8 text-6xl font-bold text-center">
          Rate Food Daily <br />{" "}
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">
            Track wastage
          </span>{" "}
          in Seconds.
        </p>

        <p className="mt-5 max-w-prose text-accent-foreground sm:text-lg text-center">
          Ecodine is an web app that is used to rate the food in daily basis it
          gives you weekly analysis on your food wastage and rating.
        </p>
        <RedirectButton
          user={user}
          buttonLabel="Get Started"
          redirectUrl="/food/analysis-form"
        />
      </Container>

      <div className="relative z-8 flex justify-center items-center mt-14">
        <div className="w-full h-[70vh] md:h-[100vh] top-[-6rem] absolute inset-0 hero_gradient z-[-1]" />

        <div className="w-full h-[70vh] md:h-[100vh] top-[-6rem] absolute inset-0 bg-gradient-to-b from-transparent dark:to-black to-white z-[-1]" />

        <div className="w-full h-full bg-zinc-300/40 dark:bg-zinc-300/10 p-2 border  md:p-5 rounded-lg backdrop-blur-lg mx-6 max-w-7xl sm:mx-16">
          <Image
            width={1000}
            height={1000}
            sizes="100vw"
            src="/hero.png"
            alt="hero-image"
            className="w-fit h-full rounded-lg border "
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
