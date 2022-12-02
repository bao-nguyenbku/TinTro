--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE tin_tro;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md50da9ad9e72f4a215ede570b27a736c4a';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5 (Debian 13.5-1.pgdg110+1)
-- Dumped by pg_dump version 13.5 (Debian 13.5-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5 (Debian 13.5-1.pgdg110+1)
-- Dumped by pg_dump version 13.5 (Debian 13.5-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- Database "tin_tro" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5 (Debian 13.5-1.pgdg110+1)
-- Dumped by pg_dump version 13.5 (Debian 13.5-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: tin_tro; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE tin_tro WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE tin_tro OWNER TO postgres;

\connect tin_tro

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'USER'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: RoomStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."RoomStatus" AS ENUM (
    'RENTING',
    'AVAILABLE'
);


ALTER TYPE public."RoomStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Accommodation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Accommodation" (
    id integer NOT NULL,
    name text NOT NULL,
    "addressNumber" text NOT NULL,
    "addressStreet" text NOT NULL,
    "addressDistrict" text NOT NULL,
    "addressCity" text NOT NULL,
    area double precision NOT NULL,
    price integer DEFAULT 0 NOT NULL,
    "ownerId" integer NOT NULL,
    description text NOT NULL,
    thumbnail text DEFAULT ''::text NOT NULL,
    images text[] DEFAULT ARRAY[''::text],
    utilities text[]
);


ALTER TABLE public."Accommodation" OWNER TO postgres;

--
-- Name: Accommodation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Accommodation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Accommodation_id_seq" OWNER TO postgres;

--
-- Name: Accommodation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Accommodation_id_seq" OWNED BY public."Accommodation".id;


--
-- Name: Room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Room" (
    id integer NOT NULL,
    "accommodationId" integer NOT NULL,
    status public."RoomStatus" NOT NULL
);


ALTER TABLE public."Room" OWNER TO postgres;

--
-- Name: Room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Room_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Room_id_seq" OWNER TO postgres;

--
-- Name: Room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Room_id_seq" OWNED BY public."Room".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Accommodation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Accommodation" ALTER COLUMN id SET DEFAULT nextval('public."Accommodation_id_seq"'::regclass);


--
-- Name: Room id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room" ALTER COLUMN id SET DEFAULT nextval('public."Room_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Accommodation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Accommodation" (id, name, "addressNumber", "addressStreet", "addressDistrict", "addressCity", area, price, "ownerId", description, thumbnail, images, utilities) FROM stdin;
1	Nhà trọ Phúc Thiên	123/12	Trần Phú	Quận 10	Hồ Chí Minh	30.5	2100000	1	Đây là mô tả cho nhà trọ này	https://blog.rever.vn/hubfs/cho_thue_phong_tro_moi_xay_gia_re_ngay_phuong_15_tan_binh3.jpg	{https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2021/11/16/cho-thue-phong-tro-1613975723_1637034014.jpg,https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2019/08/27/1_1566888997.jpg}	{}
2	Nhà trọ Phong Nhất	156	Nguyễn Huệ	Quận 1	Hồ Chí Minh	24.5	1750000	2	Nhà trọ nằm tại khu vực đắc địa của thành phố Hồ Chí Minh	http://sbshouse.vn/wp-content/uploads/2020/05/thiet-ke-nha-tro-cho-thue-ket-hop-sieu-thi-6.jpg	{https://dichvuchuyendo.net/wp-content/uploads/2020/10/phong-tro.jpg,https://static2.yan.vn/YanNews/2167221/202008/117138659_2049754861827696_6445929331803413929_o-b662fc8c.jpg}	{}
\.


--
-- Data for Name: Room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Room" (id, "accommodationId", status) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, role, email, phone, password, name, "createdAt", "updatedAt") FROM stdin;
1	USER	bao@gmail.com	012345678	password	Bảo Nguyễn	2022-11-29 07:10:20.851	2022-11-29 07:10:20.851
2	USER	trung@gmail.com	0934156799	password	Trung Lê	2022-11-29 07:11:08.647	2022-11-29 07:11:08.647
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
f42c2f73-184b-4cc9-bccd-553c7d5c9ecf	b2236f7ec04447f6f8077c659ebbd0178cd9edb2b4f117b73c979474f02f0556	2022-11-29 07:09:24.812153+00	20221129070924_init	\N	\N	2022-11-29 07:09:24.695561+00	1
\.


--
-- Name: Accommodation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Accommodation_id_seq"', 2, true);


--
-- Name: Room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Room_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 2, true);


--
-- Name: Accommodation Accommodation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Accommodation"
    ADD CONSTRAINT "Accommodation_pkey" PRIMARY KEY (id);


--
-- Name: Room Room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Accommodation_ownerId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Accommodation_ownerId_key" ON public."Accommodation" USING btree ("ownerId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "User_id_idx" ON public."User" USING btree (id);


--
-- Name: User_phone_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_phone_key" ON public."User" USING btree (phone);


--
-- Name: Accommodation Accommodation_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Accommodation"
    ADD CONSTRAINT "Accommodation_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Room Room_accommodationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES public."Accommodation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

