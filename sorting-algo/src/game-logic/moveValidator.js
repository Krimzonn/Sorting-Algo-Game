function moveValidator(currentCards, selectedIndices, steps, currentStepIndex) {
  const expectedStep = steps[currentStepIndex];
  const expectedArr = expectedStep;

  const simulate = [...currentCards];
  const [i, j] = selectedIndices;

  let temp = simulate[i];
  simulate[i] = simulate[j];
  simulate[j] = temp;

  return JSON.stringify(simulate) === JSON.stringify(expectedArr);
}

export default moveValidator;
