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
-- Name: RentingStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."RentingStatus" AS ENUM (
    'CHECKOUT',
    'RENTING'
);


ALTER TYPE public."RentingStatus" OWNER TO postgres;

--
-- Name: RequestStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."RequestStatus" AS ENUM (
    'WAITING',
    'CONFIRM'
);


ALTER TYPE public."RequestStatus" OWNER TO postgres;

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

--
-- Name: ServiceStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ServiceStatus" AS ENUM (
    'PURCHASED',
    'NONE'
);


ALTER TYPE public."ServiceStatus" OWNER TO postgres;

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
    images text[] DEFAULT ARRAY[]::text[],
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
-- Name: Message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Message" (
    id integer NOT NULL,
    text text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "fromId" integer NOT NULL,
    "messageSectionId" integer NOT NULL
);


ALTER TABLE public."Message" OWNER TO postgres;

--
-- Name: MessageSection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MessageSection" (
    id integer NOT NULL
);


ALTER TABLE public."MessageSection" OWNER TO postgres;

--
-- Name: MessageSection_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MessageSection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MessageSection_id_seq" OWNER TO postgres;

--
-- Name: MessageSection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MessageSection_id_seq" OWNED BY public."MessageSection".id;


--
-- Name: Message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Message_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Message_id_seq" OWNER TO postgres;

--
-- Name: Message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Message_id_seq" OWNED BY public."Message".id;


--
-- Name: Owner; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Owner" (
    "userId" integer NOT NULL
);


ALTER TABLE public."Owner" OWNER TO postgres;

--
-- Name: Parking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Parking" (
    id integer NOT NULL,
    "renterId" integer NOT NULL,
    "roomId" integer NOT NULL,
    "licensePlate" text NOT NULL,
    name text NOT NULL,
    "purchaseStatus" public."ServiceStatus" NOT NULL,
    "startDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Parking" OWNER TO postgres;

--
-- Name: Parking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Parking_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Parking_id_seq" OWNER TO postgres;

--
-- Name: Parking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Parking_id_seq" OWNED BY public."Parking".id;


--
-- Name: RentRequest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RentRequest" (
    id integer NOT NULL,
    "renterId" integer NOT NULL,
    "ownerId" integer NOT NULL,
    "accommodationId" integer NOT NULL,
    status public."RequestStatus" NOT NULL
);


ALTER TABLE public."RentRequest" OWNER TO postgres;

--
-- Name: RentRequest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RentRequest_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RentRequest_id_seq" OWNER TO postgres;

--
-- Name: RentRequest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RentRequest_id_seq" OWNED BY public."RentRequest".id;


--
-- Name: Renter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Renter" (
    "userId" integer NOT NULL,
    "rentRoomId" integer
);


ALTER TABLE public."Renter" OWNER TO postgres;

--
-- Name: Renting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Renting" (
    id integer NOT NULL,
    "renterId" integer NOT NULL,
    "accommodationId" integer NOT NULL,
    "ownerId" integer NOT NULL,
    "roomId" integer NOT NULL,
    status public."RentingStatus" NOT NULL,
    "requestRole" public."Role" DEFAULT 'USER'::public."Role" NOT NULL
);


ALTER TABLE public."Renting" OWNER TO postgres;

--
-- Name: Renting_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Renting_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Renting_id_seq" OWNER TO postgres;

--
-- Name: Renting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Renting_id_seq" OWNED BY public."Renting".id;


--
-- Name: Review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Review" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "accommodationId" integer NOT NULL,
    rating integer NOT NULL
);


ALTER TABLE public."Review" OWNER TO postgres;

--
-- Name: Review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Review_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Review_id_seq" OWNER TO postgres;

--
-- Name: Review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Review_id_seq" OWNED BY public."Review".id;


--
-- Name: Room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Room" (
    id integer NOT NULL,
    "accommodationId" integer NOT NULL,
    "roomName" text DEFAULT ''::text NOT NULL,
    status public."RoomStatus" NOT NULL,
    "personNumber" integer DEFAULT 0 NOT NULL
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
    "updatedAt" timestamp(3) without time zone NOT NULL,
    avatar text DEFAULT 'https://obedient-veil-production.up.railway.app/public/default-avatar.png'::text NOT NULL
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
-- Name: Wifi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Wifi" (
    id integer NOT NULL,
    "roomId" integer NOT NULL,
    name text NOT NULL,
    password text NOT NULL,
    speed text NOT NULL,
    "purchaseStatus" public."ServiceStatus" NOT NULL,
    price integer NOT NULL,
    "startDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Wifi" OWNER TO postgres;

--
-- Name: Wifi_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Wifi_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Wifi_id_seq" OWNER TO postgres;

--
-- Name: Wifi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Wifi_id_seq" OWNED BY public."Wifi".id;


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
-- Name: _users_in_message_section; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._users_in_message_section (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public._users_in_message_section OWNER TO postgres;

--
-- Name: Accommodation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Accommodation" ALTER COLUMN id SET DEFAULT nextval('public."Accommodation_id_seq"'::regclass);


--
-- Name: Message id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message" ALTER COLUMN id SET DEFAULT nextval('public."Message_id_seq"'::regclass);


--
-- Name: MessageSection id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessageSection" ALTER COLUMN id SET DEFAULT nextval('public."MessageSection_id_seq"'::regclass);


--
-- Name: Parking id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Parking" ALTER COLUMN id SET DEFAULT nextval('public."Parking_id_seq"'::regclass);


--
-- Name: RentRequest id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RentRequest" ALTER COLUMN id SET DEFAULT nextval('public."RentRequest_id_seq"'::regclass);


--
-- Name: Renting id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Renting" ALTER COLUMN id SET DEFAULT nextval('public."Renting_id_seq"'::regclass);


--
-- Name: Review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review" ALTER COLUMN id SET DEFAULT nextval('public."Review_id_seq"'::regclass);


--
-- Name: Room id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room" ALTER COLUMN id SET DEFAULT nextval('public."Room_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: Wifi id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Wifi" ALTER COLUMN id SET DEFAULT nextval('public."Wifi_id_seq"'::regclass);


--
-- Data for Name: Accommodation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Accommodation" (id, name, "addressNumber", "addressStreet", "addressDistrict", "addressCity", area, price, "ownerId", description, thumbnail, images, utilities) FROM stdin;
3	Nhà trọ Sadora	13	Mai Chí Thọ	Quận 2	Hồ Chí Minh	34.7	2800000	11	Nhà trọ đắt đỏ quận 2	https://mogi.vn/news/wp-content/uploads/2020/03/tim-phong-tro.jpg	{https://timescityminhkhai.com/wp-content/uploads/sites/7/2020/10/phong-tro-cho-thue.jpg}	{"Miễn phí wifi 2 tháng đầu","Giảm giá phòng 15% 6 tháng"}
2	Nhà trọ Penthouse	14	Nguyễn Bỉnh Khiêm	Quận 1	Hồ Chí Minh	34.8	2400000	12	Nhà trọ phong cách quý tộc đỉnh cao	https://images.cenhomes.vn/2020/03/1585033152-can-ho-mau-eurowindow-river-park.jpg	{https://e8rbh6por3n.exactdn.com/sites/uploads/2020/05/chung-cu-la-gi-thumbnail.jpg?strip=all&lossy=1&ssl=1,https://noithatviet24h.vn/wp-content/uploads/2020/08/hinh-anh-can-ho-chung-cu-dep-3.jpg,https://digistay.co/wp-content/uploads/2018/07/nha-tro-cho-thue.jpg,https://datnenthuongmai.com/img/uploads/tin-tuc/kinh%20ngiem/nha-tro.jpg,https://xaydungtienthanh.vn/wp-content/uploads/2019/12/xay-nha-tro-cap-4.jpg}	{"Miễn phí wifi 2 tháng đầu","Giảm giá phòng 15% 6 tháng"}
1	Nhà Trọ Phát Lộc	123	Trần Não	Quận 2	Hồ Chí Minh	23.5	1200000	10	Đây là mô tả cho nhà trọ này	https://bandon.vn/uploads/posts/thiet-ke-nha-tro-dep-2020-bandon-0.jpg	{https://xaydungthuanphuoc.com/wp-content/uploads/2022/09/mau-phong-tro-co-gac-lung-dep2022-5.jpg,https://xaydungthuanphuoc.com/wp-content/uploads/2022/09/mau-phong-tro-co-gac-lung-dep2013-7.jpg}	{"Miễn phí wifi 2 tháng đầu","Giảm giá phòng 15% 6 tháng"}
\.


--
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Message" (id, text, "createdAt", "fromId", "messageSectionId") FROM stdin;
\.


--
-- Data for Name: MessageSection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MessageSection" (id) FROM stdin;
1
2
\.


--
-- Data for Name: Owner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Owner" ("userId") FROM stdin;
10
11
12
\.


--
-- Data for Name: Parking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Parking" (id, "renterId", "roomId", "licensePlate", name, "purchaseStatus", "startDate") FROM stdin;
\.


--
-- Data for Name: RentRequest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RentRequest" (id, "renterId", "ownerId", "accommodationId", status) FROM stdin;
94	13	11	3	WAITING
\.


--
-- Data for Name: Renter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Renter" ("userId", "rentRoomId") FROM stdin;
13	\N
14	\N
15	\N
\.


--
-- Data for Name: Renting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Renting" (id, "renterId", "accommodationId", "ownerId", "roomId", status, "requestRole") FROM stdin;
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (id, "userId", "accommodationId", rating) FROM stdin;
\.


--
-- Data for Name: Room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Room" (id, "accommodationId", "roomName", status, "personNumber") FROM stdin;
8	3	A-234	AVAILABLE	0
9	3	B-2456	AVAILABLE	0
10	3	C-5632	AVAILABLE	0
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, role, email, phone, password, name, "createdAt", "updatedAt", avatar) FROM stdin;
13	USER	lehao@gmail.com	3480205205	$2b$10$NPedP7UFLL85uyp.OGAtzuM.JJ189m9.atZgWW17vwwv5DaZj.Tqe	lehao	2022-12-09 03:23:36.073	2022-12-09 03:23:36.073	https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png
14	USER	danhong@gmail.com	123987054	$2b$10$wJbtfvGB456eRIQncLq09u6Pp9Rf9ipkceGIkGHmuxGLuGe4bgDvW	danhong	2022-12-09 03:23:48.588	2022-12-09 03:23:48.588	https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png
15	USER	phucnguyen@gmail.com	4575092022	$2b$10$u/EV4e9aUziDh06nYCMoPucepmH.K.yPVI.3WlYDaGhRTj0rZTQL6	phucnguyen	2022-12-09 03:24:26.146	2022-12-09 03:24:26.146	https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png
11	ADMIN	trungtran@gmail.com	0345128458	$2b$10$srTUbp..5fZijY45POAR9.nAuILpBmzkyC3ZQhoplS3.l5B9zNOHu	Trần Quang Trung	2022-12-09 03:23:10.004	2022-12-12 05:46:40.42	https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png
10	ADMIN	baonguyen@gmail.com	0934186549	$2b$10$zc1yvLI/ZezIgcNq4OA1g.XpEdqt1.R2muoIzJmNzF0op5A9NFMWC	Bảo Nguyễn	2022-12-09 03:22:48.005	2022-12-12 05:46:48.163	https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png
12	ADMIN	duyenle@gmail.com	5683925463	$2b$10$pzu/mz4MIVldW8ijz3S/oen..Q/xvpKn28FDMjFIelI.cg08MmkHW	Lê Thùy Duyên	2022-12-09 03:23:22.158	2022-12-12 05:46:55.868	https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png
\.


--
-- Data for Name: Wifi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Wifi" (id, "roomId", name, password, speed, "purchaseStatus", price, "startDate") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
8f0fcefd-8b02-4bfc-95d4-ba8652b3c75d	b2236f7ec04447f6f8077c659ebbd0178cd9edb2b4f117b73c979474f02f0556	2022-12-09 03:19:50.932304+00	20221129070924_init	\N	\N	2022-12-09 03:19:50.82604+00	1
eede772b-1d95-4df9-a60a-f08043d887cf	dc3d5dad5344618daf0ad1ae39bcb9bfae82d1a775474f524eafce9cb3edbfaa	2022-12-09 03:19:52.893134+00	20221203090406_init	\N	\N	2022-12-09 03:19:52.822732+00	1
a16abcf0-81d2-4414-9670-f8cc9800ee1b	520f14d40885ab0da263c3cab5a0900f5c56db3b1b95547ec1168eef114a1741	2022-12-09 03:19:51.100221+00	20221129084549_init	\N	\N	2022-12-09 03:19:50.982056+00	1
b6c0339e-eb6d-489f-91b4-0a3f09b680d2	0e6e4527c13d072dfb4b55db486d0dca69ab7309aca3d054e03ea06c40f50f51	2022-12-09 03:19:51.164382+00	20221129101527_init	\N	\N	2022-12-09 03:19:51.105467+00	1
c3b81387-7a06-41f4-b53d-99e9224eaf8d	8f85517e3c4626637ac166656649af8fdc32e8e45cf46b936f684104e9771d8c	2022-12-09 03:19:51.311058+00	20221129101616_init	\N	\N	2022-12-09 03:19:51.210163+00	1
c2660b63-b10a-42f3-897d-3dc672f1c37e	6a48979c5fdfa43e283d83b1cdc3ff340ac539b614ce655a18a25469abf7531d	2022-12-09 03:19:53.043155+00	20221205041338_init	\N	\N	2022-12-09 03:19:52.942507+00	1
5cee7817-c4e2-4308-b158-171d0cd9ecd7	a8eb31562dc3b1d5653a6ed39491ce2bf60b4187cd6b1883b262782a85efb1dc	2022-12-09 03:19:51.462852+00	20221129125147_init	\N	\N	2022-12-09 03:19:51.358113+00	1
c27ba327-a439-4949-9476-4bd6b2007775	6213d8cda9f934b57bb1f4fbb7baec88d35c6f30d4b191a202eb6fae88b8cddb	2022-12-09 03:19:51.601123+00	20221129152548_init	\N	\N	2022-12-09 03:19:51.50982+00	1
1fc74e7f-e598-4376-a12f-ca6543b5a59b	38440593fb2f7d65f8cf41ebce4f1cd04ee70e8107c5e50c53b5287d309dc345	2022-12-09 03:19:51.658805+00	20221129152824_init	\N	\N	2022-12-09 03:19:51.605591+00	1
a0c4815f-1d8d-41a4-8efb-566751984092	3962d13b8820bfd49be6e657eace2450baa99e397c9a36f27102cb51d681d5d3	2022-12-09 03:19:53.147475+00	20221205042026_add_review_migrations	\N	\N	2022-12-09 03:19:53.048056+00	1
147bf401-f266-43e3-a81e-a2524f63a13a	741f9cda608a14468ae2cf48753229b6d0b3aef47b2d7c5983f731020660cb2f	2022-12-09 03:19:51.812124+00	20221129154757_init	\N	\N	2022-12-09 03:19:51.710239+00	1
16002dbe-47c0-4a31-bd2e-b29242134eb3	87b08d67df870907da7dcdb6c11937c10389408ab70451da806fec320a3e571e	2022-12-09 03:19:51.996426+00	20221129155202_init	\N	\N	2022-12-09 03:19:51.898201+00	1
6c7e63c4-8cb6-4191-825b-c566f4501886	99896d5c5c086fc8d74300a66feb3d51437df2a1d45ef00cbd602ebbe2020ab8	2022-12-09 03:19:52.147671+00	20221130043819_init	\N	\N	2022-12-09 03:19:52.045738+00	1
586cfc2a-739f-4e78-acf0-2f1e45761200	28f831f9e03b6514ea8fa2a66bd1a7648e92428dab0bf57c5f0b84409d582ee8	2022-12-09 03:20:02.634011+00	20221209032001_init	\N	\N	2022-12-09 03:20:02.578174+00	1
84ed008d-30a8-4d25-aed8-e4874203f2c2	5a32623ab73e3895c928e15a0929d259c3c05d33b265b108fa0b85ff15db226c	2022-12-09 03:19:52.301623+00	20221130145626_init	\N	\N	2022-12-09 03:19:52.194419+00	1
d5f1ab90-1389-49c7-8c36-14b516be4c78	b2236f7ec04447f6f8077c659ebbd0178cd9edb2b4f117b73c979474f02f0556	2022-12-02 14:45:22.136951+00	20221129070924_init	\N	\N	2022-12-02 14:45:22.013511+00	1
49fbb592-e162-4867-97d4-7da1c17cdf43	a4540a83d0d86395af1563ff2ab41b926bd630ccb3b97839bbacce240c5d8604	2022-12-09 03:19:52.451895+00	20221130151849_init	\N	\N	2022-12-09 03:19:52.350305+00	1
a5ff1e9e-d77a-4639-af6d-ba8bfed2ffba	520f14d40885ab0da263c3cab5a0900f5c56db3b1b95547ec1168eef114a1741	2022-12-02 14:45:22.284261+00	20221129084549_init	\N	\N	2022-12-02 14:45:22.184769+00	1
69bc72b3-310c-4eb3-9bff-728b1c243cd2	6cc8c7074c95d085dd2936c6e8b89d1a0c4dfa406e7c83240cb35ad12f69c928	2022-12-09 03:19:52.607185+00	20221201090037_init	\N	\N	2022-12-09 03:19:52.50198+00	1
f2eb5ed1-a7f8-45d5-b1c4-df38627073ac	7a493340c9c69adaf75c60f98f6985452a7f1e450d4c67102c0739e1fe368a16	2022-12-02 14:45:22.440732+00	20221201084001_merge	\N	\N	2022-12-02 14:45:22.336137+00	1
16a68f2c-034f-4f4b-a9ec-3c74d9a0266e	518addc0356479b6f161787858b325373bffb819880800f067fd92d9a1b6f13d	2022-12-09 03:19:52.770562+00	20221201090532_init	\N	\N	2022-12-09 03:19:52.661391+00	1
2bb7ee1d-71d7-4cac-9024-4b7b7a4ce98d	6cc8c7074c95d085dd2936c6e8b89d1a0c4dfa406e7c83240cb35ad12f69c928	2022-12-02 14:45:22.604904+00	20221201090037_init	\N	\N	2022-12-02 14:45:22.492984+00	1
929feec9-527e-4f81-81b3-c5f9b3ffbeaf	518addc0356479b6f161787858b325373bffb819880800f067fd92d9a1b6f13d	2022-12-02 14:45:22.732328+00	20221201090532_init	\N	\N	2022-12-02 14:45:22.652743+00	1
0ff6a5a7-c30b-4174-96b4-b403a4d5b010	dc3d5dad5344618daf0ad1ae39bcb9bfae82d1a775474f524eafce9cb3edbfaa	2022-12-03 09:04:07.368656+00	20221203090406_init	\N	\N	2022-12-03 09:04:07.253081+00	1
1571a388-fac1-4c7f-aa0c-64ac1adbb943	6a48979c5fdfa43e283d83b1cdc3ff340ac539b614ce655a18a25469abf7531d	2022-12-05 04:13:39.500378+00	20221205041338_init	\N	\N	2022-12-05 04:13:39.404207+00	1
47f1bd7d-ee61-41c9-b9bc-7007c4626a23	3962d13b8820bfd49be6e657eace2450baa99e397c9a36f27102cb51d681d5d3	2022-12-05 06:02:58.595337+00	20221205042026_add_review_migrations	\N	\N	2022-12-05 06:02:58.496923+00	1
\.


--
-- Data for Name: _users_in_message_section; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._users_in_message_section ("A", "B") FROM stdin;
\.


--
-- Name: Accommodation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Accommodation_id_seq"', 3, true);


--
-- Name: MessageSection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MessageSection_id_seq"', 2, true);


--
-- Name: Message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Message_id_seq"', 3, true);


--
-- Name: Parking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Parking_id_seq"', 1, false);


--
-- Name: RentRequest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RentRequest_id_seq"', 94, true);


--
-- Name: Renting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Renting_id_seq"', 2, true);


--
-- Name: Review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Review_id_seq"', 2, true);


--
-- Name: Room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Room_id_seq"', 10, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 15, true);


--
-- Name: Wifi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Wifi_id_seq"', 1, false);


--
-- Name: Accommodation Accommodation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Accommodation"
    ADD CONSTRAINT "Accommodation_pkey" PRIMARY KEY (id);


--
-- Name: MessageSection MessageSection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessageSection"
    ADD CONSTRAINT "MessageSection_pkey" PRIMARY KEY (id);


--
-- Name: Message Message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY (id);


--
-- Name: Parking Parking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Parking"
    ADD CONSTRAINT "Parking_pkey" PRIMARY KEY (id);


--
-- Name: RentRequest RentRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RentRequest"
    ADD CONSTRAINT "RentRequest_pkey" PRIMARY KEY (id);


--
-- Name: Renting Renting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Renting"
    ADD CONSTRAINT "Renting_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


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
-- Name: Wifi Wifi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Wifi"
    ADD CONSTRAINT "Wifi_pkey" PRIMARY KEY (id);


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
-- Name: Message_id_fromId_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Message_id_fromId_createdAt_idx" ON public."Message" USING btree (id, "fromId", "createdAt");


--
-- Name: Owner_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Owner_userId_idx" ON public."Owner" USING btree ("userId");


--
-- Name: Owner_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Owner_userId_key" ON public."Owner" USING btree ("userId");


--
-- Name: Parking_renterId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Parking_renterId_key" ON public."Parking" USING btree ("renterId");


--
-- Name: RentRequest_accommodationId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "RentRequest_accommodationId_key" ON public."RentRequest" USING btree ("accommodationId");


--
-- Name: Renter_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Renter_userId_idx" ON public."Renter" USING btree ("userId");


--
-- Name: Renter_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Renter_userId_key" ON public."Renter" USING btree ("userId");


--
-- Name: Renting_renterId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Renting_renterId_key" ON public."Renting" USING btree ("renterId");


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
-- Name: Wifi_roomId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Wifi_roomId_key" ON public."Wifi" USING btree ("roomId");


--
-- Name: _users_in_message_section_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_users_in_message_section_AB_unique" ON public._users_in_message_section USING btree ("A", "B");


--
-- Name: _users_in_message_section_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_users_in_message_section_B_index" ON public._users_in_message_section USING btree ("B");


--
-- Name: Accommodation Accommodation_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Accommodation"
    ADD CONSTRAINT "Accommodation_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."Owner"("userId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Message Message_fromId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Message Message_messageSectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_messageSectionId_fkey" FOREIGN KEY ("messageSectionId") REFERENCES public."MessageSection"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Owner Owner_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Owner"
    ADD CONSTRAINT "Owner_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Parking Parking_renterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Parking"
    ADD CONSTRAINT "Parking_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES public."Renter"("userId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Parking Parking_roomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Parking"
    ADD CONSTRAINT "Parking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES public."Room"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RentRequest RentRequest_accommodationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RentRequest"
    ADD CONSTRAINT "RentRequest_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES public."Accommodation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RentRequest RentRequest_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RentRequest"
    ADD CONSTRAINT "RentRequest_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."Owner"("userId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RentRequest RentRequest_renterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RentRequest"
    ADD CONSTRAINT "RentRequest_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES public."Renter"("userId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Renter Renter_rentRoomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Renter"
    ADD CONSTRAINT "Renter_rentRoomId_fkey" FOREIGN KEY ("rentRoomId") REFERENCES public."Room"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Renter Renter_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Renter"
    ADD CONSTRAINT "Renter_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Renting Renting_accommodationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Renting"
    ADD CONSTRAINT "Renting_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES public."Accommodation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Renting Renting_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Renting"
    ADD CONSTRAINT "Renting_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."Owner"("userId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Renting Renting_renterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Renting"
    ADD CONSTRAINT "Renting_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES public."Renter"("userId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Renting Renting_roomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Renting"
    ADD CONSTRAINT "Renting_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES public."Room"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_accommodationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES public."Accommodation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Room Room_accommodationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES public."Accommodation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Wifi Wifi_roomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Wifi"
    ADD CONSTRAINT "Wifi_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES public."Room"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _users_in_message_section _users_in_message_section_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._users_in_message_section
    ADD CONSTRAINT "_users_in_message_section_A_fkey" FOREIGN KEY ("A") REFERENCES public."MessageSection"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _users_in_message_section _users_in_message_section_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._users_in_message_section
    ADD CONSTRAINT "_users_in_message_section_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

