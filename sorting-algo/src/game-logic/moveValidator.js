function moveValidator(currentCards, selectedIndices, steps, currentStepIndex) {
  const simulate = [...currentCards];

  const [i, j] = selectedIndices;

  let temp = simulate[i];
  simulate[i] = simulate[j];
  simulate[j] = temp;

  const expectedStep = steps[currentStepIndex];

  return JSON.stringify(simulate) === JSON.stringify(expectedStep);
}

export default moveValidator;
