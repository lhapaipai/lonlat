export interface ViolationErrors {
  [property: string]: string;
}

export class SubmissionError extends Error {
  private readonly _violations: ViolationErrors;

  constructor(message: string, violations: ViolationErrors) {
    super(message);
    this._violations = violations;
  }

  public get violations(): ViolationErrors {
    return this._violations;
  }
}

export class FetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FetchError";
  }
}

export class DeletedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DeletedError";
  }
}

export const submissionHandler = (_: Response, json: any) => {
  if (!json.violations) {
    return;
  }

  const message =
    json["hydra:description"] || json["hydra:title"] || json["message"] || "An error occurred.";

  const violations: { propertyPath: string; message: string }[] = json.violations;

  const violationsByProperty = violations.reduce((violationsByProperty, violation) => {
    if (violationsByProperty[violation.propertyPath]) {
      violationsByProperty[violation.propertyPath] += "\n" + violation.message;
    } else {
      violationsByProperty[violation.propertyPath] = violation.message;
    }

    return violationsByProperty;
  }, {} as ViolationErrors);

  throw new SubmissionError(message, violationsByProperty);
};

export const regularHandler = (_: Response, json: any) => {
  const error =
    json["hydra:description"] || json["hydra:title"] || json["message"] || "An error occurred.";

  throw new FetchError(error);
};
