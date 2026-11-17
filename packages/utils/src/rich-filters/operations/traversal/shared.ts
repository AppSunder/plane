/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

// plane imports
import type { TAllAvailableOperatorsForDisplay, TSupportedOperators } from "@plane/types";
// local imports
import { getNegatedOperator } from "../../operators/shared";

/**
 * Helper function to get the display operator for a condition.
 * A negated condition is shown with the negated variant of its operator (e.g. "is not").
 * @param operator - The original operator
 * @param isNegated - Whether the condition is negated
 * @returns The display operator (possibly negated)
 */
export const getDisplayOperator = (
  operator: TSupportedOperators,
  isNegated: boolean | undefined
): TAllAvailableOperatorsForDisplay => (isNegated ? getNegatedOperator(operator) : operator);
