import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://aactublcedstkt:bcd5da9a89971ef6dcca69287dd090b67b2cfeeb4962b0d1116806dc3cb2e2ce@ec2-54-225-190-241.compute-1.amazonaws.com:5432/d3iue6apg4g1f4',
    idleTimeoutMillis: 30000
});
