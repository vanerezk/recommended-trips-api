import "dotenv/config.js";
import connectDB from "./db.js";

const db = connectDB();

const DB_NAME = process.env.MYSQL_DB;

console.log("Limpiando base de datos...");
await db.query(`DROP DATABASE IF EXISTS ${DB_NAME}`);

console.log("Creando base de datos...");
await db.query(`CREATE DATABASE ${DB_NAME}`);

await db.query(`USE ${DB_NAME}`);

console.log("Creando tabla usuarios...");
await db.query(`
CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    photo VARCHAR(255),
    nickName VARCHAR(64) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(64) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`);

console.log("Creando tabla de categorías...");
await db.query(`
CREATE TABLE categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  photo VARCHAR(255)
);

`);

console.log("Creando columnas de categorías...");
await db.query(`
INSERT INTO categories (category) VALUES
('Choose a category'),
('Nature'),
('Cultural'),
('Gastronomic'),
('Relax'),
('Familiar'),
('Outside Activities'),
('Shopping'),
('Hotels');
`);

console.log("Creando table de ubicaciones...");
await db.query(`
CREATE TABLE locations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(100) NOT NULL,
    continent VARCHAR(100)
);
`);

console.log("Creando columnas de ubicaciones...");
await db.query(`
INSERT INTO locations (country, continent) VALUES
('Choose a country', NULL),
('Afghanistan', 'Asia'),
('Aland Islands', 'Europe'),
('Albania', 'Europe'),
('Algeria', 'Africa'),
('American Samoa', 'Oceania'),
('Andorra', 'Europe'),
('Angola', 'Africa'),
('Anguilla', 'North America'),
('Antarctica', 'Antarctica'),
('Antigua and Barbuda', 'North America'),
('Argentina', 'South America'),
('Armenia', 'Asia'),
('Aruba', 'North America'),
('Australia', 'Oceania'),
('Austria', 'Europe'),
('Azerbaijan', 'Asia'),
('Bahamas', 'North America'),
('Bahrain', 'Asia'),
('Bangladesh', 'Asia'),
('Barbados', 'North America'),
('Belarus', 'Europe'),
('Belgium', 'Europe'),
('Belize', 'North America'),
('Benin', 'Africa'),
('Bermuda', 'North America'),
('Bhutan', 'Asia'),
('Bolivia', 'South America'),
('Bonaire, Sint Eustatius and Saba', 'North America'),
('Bosnia and Herzegovina', 'Europe'),
('Botswana', 'Africa'),
('Bouvet Island', 'Antarctica'),
('Brazil', 'South America'),
('British Indian Ocean Territory', 'Asia'),
('Brunei Darussalam', 'Asia'),
('Bulgaria', 'Europe'),
('Burkina Faso', 'Africa'),
('Burundi', 'Africa'),
('Cambodia', 'Asia'),
('Cameroon', 'Africa'),
('Canada', 'North America'),
('Cape Verde', 'Africa'),
('Cayman Islands', 'North America'),
('Central African Republic', 'Africa'),
('Chad', 'Africa'),
('Chile', 'South America'),
('China', 'Asia'),
('Christmas Island', 'Asia'),
('Cocos (Keeling) Islands', 'Asia'),
('Colombia', 'South America'),
('Comoros', 'Africa'),
('Congo', 'Africa'),
('Congo, Democratic Republic of the Congo', 'Africa'),
('Cook Islands', 'Oceania'),
('Costa Rica', 'North America'),
('Cote D''Ivoire', 'Africa'),
('Croatia', 'Europe'),
('Cuba', 'North America'),
('Curacao', 'North America'),
('Cyprus', 'Europe'),
('Czech Republic', 'Europe'),
('Denmark', 'Europe'),
('Djibouti', 'Africa'),
('Dominica', 'North America'),
('Dominican Republic', 'North America'),
('Ecuador', 'South America'),
('Egypt', 'Africa'),
('El Salvador', 'North America'),
('Equatorial Guinea', 'Africa'),
('Eritrea', 'Africa'),
('Estonia', 'Europe'),
('Ethiopia', 'Africa'),
('Falkland Islands (Malvinas)', 'South America'),
('Faroe Islands', 'Europe'),
('Fiji', 'Oceania'),
('Finland', 'Europe'),
('France', 'Europe'),
('French Guiana', 'South America'),
('French Polynesia', 'Oceania'),
('French Southern Territories', 'Antarctica'),
('Gabon', 'Africa'),
('Gambia', 'Africa'),
('Georgia', 'Asia'),
('Germany', 'Europe'),
('Ghana', 'Africa'),
('Gibraltar', 'Europe'),
('Greece', 'Europe'),
('Greenland', 'North America'),
('Grenada', 'North America'),
('Guadeloupe', 'North America'),
('Guam', 'Oceania'),
('Guatemala', 'North America'),
('Guernsey', 'Europe'),
('Guinea', 'Africa'),
('Guinea-Bissau', 'Africa'),
('Guyana', 'South America'),
('Haiti', 'North America'),
('Heard Island and Mcdonald Islands', 'Antarctica'),
('Holy See (Vatican City State)', 'Europe'),
('Honduras', 'North America'),
('Hong Kong', 'Asia'),
('Hungary', 'Europe'),
('Iceland', 'Europe'),
('India', 'Asia'),
('Indonesia', 'Asia'),
('Iran, Islamic Republic of', 'Asia'),
('Iraq', 'Asia'),
('Ireland', 'Europe'),
('Isle of Man', 'Europe'),
('Israel', 'Asia'),
('Italy', 'Europe'),
('Jamaica', 'North America'),
('Japan', 'Asia'),
('Jersey', 'Europe'),
('Jordan', 'Asia'),
('Kazakhstan', 'Asia'),
('Kenya', 'Africa'),
('Kiribati', 'Oceania'),
('Korea, Democratic People''s Republic of', 'Asia'),
('Korea, Republic of', 'Asia'),
('Kosovo', 'Europe'),
('Kuwait', 'Asia'),
('Kyrgyzstan', 'Asia'),
('Lao People''s Democratic Democratic Republic', 'Asia'),
('Latvia', 'Europe'),
('Lebanon', 'Asia'),
('Lesotho', 'Africa'),
('Liberia', 'Africa'),
('Libyan Arab Jamahiriya', 'Africa'),
('Liechtenstein', 'Europe'),
('Lithuania', 'Europe'),
('Luxembourg', 'Europe'),
('Macao', 'Asia'),
('Macedonia, The Former Yugoslav Republic of', 'Europe'),
('Madagascar', 'Africa'),
('Malawi', 'Africa'),
('Malaysia', 'Asia'),
('Maldives', 'Asia'),
('Mali', 'Africa'),
('Malta', 'Europe'),
('Marshall Islands', 'Oceania'),
('Martinique', 'North America'),
('Mauritania', 'Africa'),
('Mauritius', 'Africa'),
('Mayotte', 'Europe'),
('Mexico', 'North America'),
('Micronesia, Federated States of', 'Oceania'),
('Moldova, Republic of', 'Europe'),
('Monaco', 'Europe'),
('Mongolia', 'Asia'),
('Montenegro', 'Europe'),
('Montserrat', 'North America'),
('Morocco', 'Africa'),
('Mozambique', 'Africa'),
('Myanmar', 'Asia'),
('Namibia', 'Africa'),
('Nauru', 'Oceania'),
('Nepal', 'Asia'),
('Netherlands', 'Europe'),
('Netherlands Antilles', 'North America'),
('New Caledonia', 'Oceania'),
('New Zealand', 'Oceania'),
('Nicaragua', 'North America'),
('Niger', 'Africa'),
('Nigeria', 'Africa'),
('Niue', 'Oceania'),
('Norfolk Island', 'Oceania'),
('Northern Mariana Islands', 'Oceania'),
('Norway', 'Europe'),
('Oman', 'Asia'),
('Pakistan', 'Asia'),
('Palau', 'Oceania'),
('Palestinian Territory, Occupied', 'Asia'),
('Panama', 'North America'),
('Papua New Guinea', 'Oceania'),
('Paraguay', 'South America'),
('Peru', 'South America'),
('Philippines', 'Asia'),
('Pitcairn', 'Oceania'),
('Poland', 'Europe'),
('Portugal', 'Europe'),
('Puerto RicoO', 'North America'),
('Qatar', 'Asia'),
('Reunion', 'Africa'),
('Romania', 'Europe'),
('Russian Federation', 'Europe'),
('RWANDA', 'Africa'),
('Saint Barthelemy', 'North America'),
('Saint Helena', 'Africa'),
('Saint Kitts and Nevis', 'North America'),
('Saint Lucia', 'North America'),
('Saint Pierre and Miquelon', 'North America'),
('Saint Vincent and the Grenadines', 'North America'),
('Samoa', 'Oceania'),
('San Marino', 'Europe'),
('Sao Tome and Principe', 'Africa'),
('Saudi Arabia', 'Asia'),
('Senegal', 'Africa'),
('Serbia', 'Europe'),
('Seychelles', 'Africa'),
('Sierra Leone', 'Africa'),
('Singapore', 'Asia'),
('Slovakia', 'Europe'),
('Slovenia', 'Europe'),
('Solomon Islands', 'Oceania'),
('Somalia', 'Africa'),
('South Africa', 'Africa'),
('South Georgia and the South Sandwich Islands', 'Antarctica'),
('Spain', 'Europe'),
('Sri Lanka', 'Asia'),
('Sudan', 'Africa'),
('Suriname', 'South America'),
('Svalbard and Jan Mayen', 'Europe'),
('Swaziland', 'Africa'),
('Sweden', 'Europe'),
('Switzerland', 'Europe'),
('Syrian Arab Republic', 'Asia'),
('Taiwan', 'Asia'),
('Tajikistan', 'Asia'),
('Tanzania, United Republic of', 'Africa'),
('Thailand', 'Asia'),
('Timor-Leste', 'Asia'),
('Togo', 'Africa'),
('Tokelau', 'Oceania'),
('Tonga', 'Oceania'),
('Trinidad and Tobago', 'North America'),
('Tunisia', 'Africa'),
('Turkey', 'Asia'),
('Turkmenistan', 'Asia'),
('Turks and Caicos Islands', 'North America'),
('Tuvalu', 'Oceania'),
('Uganda', 'Africa'),
('Ukraine', 'Europe'),
('United Arab Emirates', 'Asia'),
('United Kingdom', 'Europe'),
('United States', 'North America'),
('United States Minor Outlying Islands', 'Oceania'),
('Uruguay', 'South America'),
('Uzbekistan', 'Asia'),
('Vanuatu', 'Oceania'),
('Venezuela', 'South America'),
('Viet Nam', 'Asia'),
('Virgin Islands, British', 'North America'),
('Virgin Islands, U.S.', 'North America'),
('Wallis and Futuna', 'Oceania'),
('Western Sahara', 'Africa'),
('Yemen', 'Asia'),
('Zambia', 'Africa'),
('Zimbabwe', 'Africa');
`);

console.log("Creando tabla recomendaciones...");
await db.query(`
CREATE TABLE recommendations (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NULL,
    locationId INT UNSIGNED NOT NULL,
    lean_in VARCHAR(100) NULL,
    userId INT UNSIGNED NOT NULL,
    description VARCHAR(1000) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (locationId) REFERENCES locations(id)
);
`);

console.log("Creando tabla de fotos de recomendaciones...");
await db.query(`
CREATE TABLE recommendationPhotos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    recommendationId INT UNSIGNED NOT NULL,
    url VARCHAR(255) NOT NULL,
    
    FOREIGN KEY (recommendationId) REFERENCES recommendations(id)
);
`);

console.log("Creando tabla comentarios...");
await db.query(`
CREATE TABLE comments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    recommendationId INT UNSIGNED NOT NULL,
    userId INT UNSIGNED NOT NULL,
    
    FOREIGN KEY (recommendationId) REFERENCES recommendations(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);
`);

console.log("Creando tabla de likes de recomendaciones...");
await db.query(`
CREATE TABLE recommendationLikes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    recommendationId INT UNSIGNED NOT NULL,
    userId INT UNSIGNED NOT NULL,
    FOREIGN KEY (recommendationId) REFERENCES recommendations(id),
    FOREIGN KEY (userId) REFERENCES users(id),
    UNIQUE(userId, recommendationId)
);
`);

console.log("Base de datos inicializada");

await db.end();
