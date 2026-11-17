/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import type { TAllAvailableOperatorsForDisplay, TNegatedOperators, TSupportedOperators } from "@plane/types";
import { CORE_COLLECTION_OPERATOR, CORE_EQUALITY_OPERATOR, NEGATED_OPERATORS } from "@plane/types";

/**
 * Maps a negated display operator to the positive operator it negates.
 */
const NEGATED_TO_POSITIVE_OPERATOR: Record<TNegatedOperators, TSupportedOperators> = {
  [NEGATED_OPERATORS.NOT_EXACT]: CORE_EQUALITY_OPERATOR.EXACT,
  [NEGATED_OPERATORS.NOT_IN]: CORE_COLLECTION_OPERATOR.IN,
};

/**
 * Maps a positive operator to its negated display operator, for the operators that can be negated.
 */
const POSITIVE_TO_NEGATED_OPERATOR: Partial<Record<TSupportedOperators, TNegatedOperators>> = {
  [CORE_EQUALITY_OPERATOR.EXACT]: NEGATED_OPERATORS.NOT_EXACT,
  [CORE_COLLECTION_OPERATOR.IN]: NEGATED_OPERATORS.NOT_IN,
};

/**
 * Returns true when the operator is a negated display operator (e.g. "is not").
 */
export const isNegatedOperator = (operator: TAllAvailableOperatorsForDisplay): operator is TNegatedOperators =>
  operator in NEGATED_TO_POSITIVE_OPERATOR;

/**
 * Returns the negated display operator for a positive operator, or the operator itself if it cannot be negated.
 */
export const getNegatedOperator = <T extends TAllAvailableOperatorsForDisplay>(operator: T): T | TNegatedOperators =>
  POSITIVE_TO_NEGATED_OPERATOR[operator as TSupportedOperators] ?? operator;

/**
 * Result type for operator conversion
 */
export type TOperatorForPayload = {
  operator: TSupportedOperators;
  isNegation: boolean;
};

/**
 * Converts a display operator to the format needed for supported by filter expression condition.
 * @param displayOperator - The operator from the UI
 * @returns Object with supported operator and negation flag
 */
export const getOperatorForPayload = (displayOperator: TAllAvailableOperatorsForDisplay): TOperatorForPayload => {
  const isNegation = isNegatedOperator(displayOperator);
  const operator = isNegatedOperator(displayOperator) ? NEGATED_TO_POSITIVE_OPERATOR[displayOperator] : displayOperator;

  return {
    operator,
    isNegation,
  };
};
