
import contentTypeBuilder from '@strapi/plugin-content-type-builder/strapi-admin';
import email from '@strapi/plugin-email/strapi-admin';
import upload from '@strapi/plugin-upload/strapi-admin';
import usersPermissions from '@strapi/plugin-users-permissions/strapi-admin';
import i18N from '@strapi/plugin-i18n/strapi-admin';


const plugins = {
  'content-type-builder': contentTypeBuilder,
  'email': email,
  'upload': upload,
  'users-permissions': usersPermissions,
  'i18n': i18N,
};

export default plugins;
