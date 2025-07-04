import Cprofilepage from '../../components/Cprofilepage';

interface Props {
  params: {
    id: string;
  };
}

export default function CelebrityProfile({ params }: Props) {
  // In a real app, you would fetch celebrity data based on params.id
  return <Cprofilepage />;
} 