import MultiStepRequirementForm from '../components/MultiStepRequirementForm';

export default function HomePage() {
  return (
    <main className="page">
      <div className="container">
        <h1>Post Event Requirement</h1>
        <p>Create a hiring requirement in 4 guided steps.</p>
        <MultiStepRequirementForm />
      </div>
    </main>
  );
}
