import { CoursePart } from '../types';

interface Props {
  part: CoursePart;
}

const Details = ({ part }: Props) => {
   switch (part.kind) {
    case 'basic':
      return (
        <>
          <p><i>{part.description}</i></p>
        </>
      )
    case 'background':
      return (
        <>
          <p>Material: {part.backgroundMaterial}</p>
        </>
      )
    case 'group':
      return (
        <>
          <p>Group projects: {part.groupProjectCount}</p>
        </>
      )
    case 'special':
      return (
        <>
          <p>Requirements: {part.requirements.map(r => `${r} `)}</p>
        </>
      )
    default:
      break;
  }
}

const Part = ({ part }: Props) => {
  return (
    <div>
      <p><b>{part.name}</b></p>
      <p>Exercises: {part.exerciseCount}</p>
      <Details part={part} />
    </div>
  );
}

export default Part;