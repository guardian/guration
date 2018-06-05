const getChangedFields = (prevFields, nextFields) =>
  Object.entries({
    ...prevFields,
    ...nextFields
  })
    .filter(([key, val]) => val !== prevFields[key])
    .reduce(
      (acc, [key, val]) => ({
        ...acc,
        [key]: val
      }),
      {}
    );

const hasFields = fields => Object.keys(fields).length === 0;

export { getChangedFields, hasFields };
