import Cprofilepage from "@/app/components/Cprofilepage";


interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CelebrityProfile({ params }: Props) {
  // await params to satisfy Next.js 15 async params requirement
  await params;
  // In a real app, you would fetch celebrity data based on params.id
  return <Cprofilepage />;
} 