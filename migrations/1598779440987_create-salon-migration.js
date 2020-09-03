/* eslint-disable camelcase */
const { v4: uuidV4 } = require('uuid');

exports.up = pgm => {
  pgm.createTable('salons', {
    id: {
      type: 'uuid',
      notNull: true,
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    business_name: { type: 'string' },
    operator_email: { type: 'string', unique: true },
    operator_phone_number: { type: 'string', unique: true },
    verified: { type: 'boolean', default: 'false' },
    deleted: { type: 'boolean', default: false },
    operator_id: { type: 'string', default: null },
    logo_url: { type: 'boolean', default: null },
    location: { type: 'jsonb', default: null },
    business_type: { type: 'jsonb', default: null },
    working_days: { type: 'jsonb', default: null },
    business_hour: { type: 'jsonb', default: null },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('salons');
};
