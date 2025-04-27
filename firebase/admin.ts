import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
function initFirebaseAdmin() {
  const apps = getApps();

  if (!apps.length) {
    initializeApp({
      credential: cert({
        projectId:"prepwise-9d223",
        clientEmail: "firebase-adminsdk-fbsvc@prepwise-9d223.iam.gserviceaccount.com",
        // Replace newlines in the private key
        privateKey:"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6zsnt5CFDCFVx\nOLga3zsshAlSo8MzFtd5dw6sYl1y4n4eF6JFALFFud077dospHNc4BUofkSiZqlo\ncmK6J92HpYzc5Gz+pziRmlho7tOSCF69bwdzTGqMYn/6bmTtCBNMxrAl+ZMZfMHF\ncD+tgJmk8RHJA6rFEXOwWsx6+lt4eyD/Kni6NuH9EGzWm0CAMb2NK5oAIGcXzOMx\nrMgxtMIsSt08iLV0MA6bTQ5pwe0XQSIVC2SfGIxh/3tN7dj3UzFCKuO6h6YT5/0J\nfb+mIJI6sjV87dEYrjJNKwbkHxbLX037QsI6jrK4af+CEcM2Wo81l9c45dN1mmp2\nE6+ZcIMzAgMBAAECggEAGFhszpkFkLPcVsYakD35e0K16FQ5U0YtzMGsYuDq5tcH\nsqpH1pBRihG/+Fh2L407D6aQe1eBYFzaxSbrIPGjGFOF+R+36LQoVil0TjCZ2BVJ\nK4z1vpv94s/Pd/a9Jnr/8OiP+lL9TbwJkM6hLd5tp6ZXOAhHUCmHFzuuHHTWSOwh\njEMm/4Wyl/rk7XnKQbVn5/FuG+7Vj8OwpYwe7oiyT67EZKlPJjwG9+hntY7YspzL\nsewxopYI3fuwMV9+cyihrQBaJ2efJYrd9FismuJife8Z8XRM22EJIE6kze0SoHZH\nqXsixkT6V4nHlDtRq2vE1Ajz2Cp4w8EH7NxVwRpFyQKBgQD6EnQOccW40Y0lnxWL\nLF0+injs6yfLwiLu4MCMlJRStM8pXm71slNaZl1LBF2VYecfvfSMq3+l8QE+VZqd\n8Fwl/vIVfn2Qeoz+aHTMqsgoCFVrqxxwk7M3c+JW32h41LqFh8LX9YTPMGK90Ujv\nmEiRhj2FUeIKI+swoK/CLDj5zQKBgQC/PGuBMTEqMt8eUpEEJEXdp7CL5A6IQPmU\nmt+R4vmf+1UYUxB+OEfKqJdqBHjtK5xM5EQGt1TRVv1kxb1uM59ZBhN0WkJMHXnx\nIn/xlhi9odgw8LZ7Wt8W+7MttVkspjLhshbpaxT1466uwyGMxNegPBzooig8WVVv\nqx7Z3v5w/wKBgB9EI2KS8weym5UymLz35Qimw4vLswQU181KKIjrIshcdvJTLkhl\n7WoGFnAEsba1sPIVC/hykNkskt06UsSggsT1ZUsur4Ba8jn00XWtfK0UralykXG5\n5dRvFsOJ10QUROXhHYlm1x4YjJ/zBM2AGsKnKBX9MOfXqdZAoPkEEnOZAoGAZXMZ\nGPVOvrM0GDL3CXpwsfD2wI+ggfnuLT6n4g3GHW/IqdnPAxa6RzF++dgbir468bOa\nvvFdBp0eWepo3uB15VVK1svXJefxO9Hwi+nzgA4u0W+xbuk7Nkcau+Hbx8r3bTH7\n46JSAUvi7IVJ9BKszS12rJbxv2oo38+o0y3wT2MCgYEAjtVdK/+KGLNJ9OcGpMUQ\nugHUsUHU7D7NaR2x4Qb4dkdxCONDuTTk4eU3RzNYAAsXi4gpNJoE6ILRPrnNXzG8\nekkgrRbStXiItupsueViQS9yu16eEtPxuIjrO/wf42Qn+TipzTnGQiWtkXbJ7IuI\nTbljduFWnD3moj9rkho0F3k=\n-----END PRIVATE KEY-----\n",
      }),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
}

export const { auth, db } = initFirebaseAdmin();