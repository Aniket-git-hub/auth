import 'dotenv/config';

function getEnvVariable(variableName) {
    const env = process.env.NODE_ENV || 'development';
    const prefixedVariableName = `${env.toUpperCase()}_${variableName}`;

    const value = process.env[prefixedVariableName];

    if (value === undefined) {
        throw new Error(
            `Environment variable ${prefixedVariableName} is not defined.`
        );
    }

    return value;
}

export default getEnvVariable;
