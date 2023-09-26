module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  settings: {
    rateLimit: {
      max: 1000000, // Maximale Anzahl der Anfragen
      timeWindow: 60000, // Zeitfenster in Millisekunden (hier 1 Minute)
    },
  },
});
