import Container from "@/components/shared/global-container";
import HeadingShortner from "@/components/shared/heading-shortner";
import { getFoodList, getSubmissionStats, getUserSession } from "@/app/actions";
import FormRenderer from "./_components/form-renderer";

interface FooodFormPageProps {}

const FooodFormPage = async ({}: FooodFormPageProps) => {
  const user = await getUserSession();

  const foodList = await getFoodList(user?.houseName!);

  const submissionTrack = await getSubmissionStats();

  return (
    <Container className="mt-14 md:mt-24 ">
      <HeadingShortner>Analysis form</HeadingShortner>

      <FormRenderer user={user} data={submissionTrack} foodList={foodList} />
    </Container>
  );
};

export default FooodFormPage;
