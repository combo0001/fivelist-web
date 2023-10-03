import { ServerDynamicVariablesType } from "@/schemas/servers/DynamicSchema"

export const searchVariable = (expressions: string[], variables: ServerDynamicVariablesType): string | undefined => {
  for (let variableName in variables) {
    const variableNameFormatted = variableName.toLowerCase() 

    if (!expressions.includes(variableNameFormatted)) continue

    const variableValue = variables[variableName]

    return variableValue
  }
}