import Container from "@/components/shared/global-container";
import HistoryTable from "./_components/history-table";
import HeadingShortner from "@/components/shared/heading-shortner";

const AnalysisHistoryPage = async () => {
  return (
    <Container className="mt-14 md:mt-24">
      <HeadingShortner className="mb-8">Your history</HeadingShortner>
      <HistoryTable />
    </Container>
  );
};

export default AnalysisHistoryPage;
