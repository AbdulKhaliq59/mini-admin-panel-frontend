// Type declarations for importing CSS and image files in TypeScript
declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";
