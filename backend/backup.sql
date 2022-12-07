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
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."Owner" OWNER TO postgres;

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
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "rentRoomId" integer,
    "userId" integer NOT NULL
);


ALTER TABLE public."Renter" OWNER TO postgres;

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
    "updatedAt" timestamp(3) without time zone NOT NULL,
    avatar text DEFAULT 'https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png'::text NOT NULL
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
-- Name: RentRequest id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RentRequest" ALTER COLUMN id SET DEFAULT nextval('public."RentRequest_id_seq"'::regclass);


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
1	Nhà Trọ Phát Lộc	123	Trần Não	Quận 2	Hồ Chí Minh	23.5	1200000	1	Đây là mô tả cho nhà trọ này	https://bandon.vn/uploads/posts/thiet-ke-nha-tro-dep-2020-bandon-0.jpg	{https://xaydungthuanphuoc.com/wp-content/uploads/2022/09/mau-phong-tro-co-gac-lung-dep2022-5.jpg,https://xaydungthuanphuoc.com/wp-content/uploads/2022/09/mau-phong-tro-co-gac-lung-dep2013-7.jpg}	{}
2	Nhà trọ Penthouse	14	Nguyễn Bỉnh Khiêm	Quận 1	Hồ Chí Minh	34.8	2400000	3	Nhà trọ phong cách quý tộc đỉnh cao	https://images.cenhomes.vn/2020/03/1585033152-can-ho-mau-eurowindow-river-park.jpg	{https://e8rbh6por3n.exactdn.com/sites/uploads/2020/05/chung-cu-la-gi-thumbnail.jpg?strip=all&lossy=1&ssl=1,https://noithatviet24h.vn/wp-content/uploads/2020/08/hinh-anh-can-ho-chung-cu-dep-3.jpg}	{}
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
\.


--
-- Data for Name: Owner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Owner" (role, email, phone, password, name, "createdAt", "updatedAt", "userId") FROM stdin;
USER	baonguyen@gmail.com	012345678	12345678	Bảo Nguyễn	2022-12-02 15:17:54.287	2022-12-03 05:08:54.82	1
USER	duyen@gmail.com	0967183457	12345678	Duyên Lê	2022-12-04 05:22:57.93	2022-12-04 05:20:21.769	3
\.


--
-- Data for Name: RentRequest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RentRequest" (id, "renterId", "ownerId", "accommodationId", status) FROM stdin;
1	2	1	1	WAITING
\.


--
-- Data for Name: Renter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Renter" (role, email, phone, password, name, "createdAt", "updatedAt", "rentRoomId", "userId") FROM stdin;
USER	trung@gmail.com	0945010023	12345678	Trung Trần	2022-12-03 05:06:57.967	2022-12-03 05:06:09.082	\N	2
\.


--
-- Data for Name: Room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Room" (id, "accommodationId", status) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, role, email, phone, password, name, "createdAt", "updatedAt", avatar) FROM stdin;
1	USER	baonguyen@gmail.com	012345678	123456789	Bảo Nguyễn	2022-12-02 15:16:02.436	2022-12-02 15:16:02.436	https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png
2	USER	trung@gmail.com	0945010023	123456789	Trung Trần	2022-12-02 15:16:02.436	2022-12-03 05:04:27.852	https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png
3	USER	duyen@gmail.com	0934567892	123456789	Duyên Lê	2022-12-04 05:22:24.453	2022-12-04 05:21:49.843	https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
d5f1ab90-1389-49c7-8c36-14b516be4c78	b2236f7ec04447f6f8077c659ebbd0178cd9edb2b4f117b73c979474f02f0556	2022-12-02 14:45:22.136951+00	20221129070924_init	\N	\N	2022-12-02 14:45:22.013511+00	1
a5ff1e9e-d77a-4639-af6d-ba8bfed2ffba	520f14d40885ab0da263c3cab5a0900f5c56db3b1b95547ec1168eef114a1741	2022-12-02 14:45:22.284261+00	20221129084549_init	\N	\N	2022-12-02 14:45:22.184769+00	1
f2eb5ed1-a7f8-45d5-b1c4-df38627073ac	7a493340c9c69adaf75c60f98f6985452a7f1e450d4c67102c0739e1fe368a16	2022-12-02 14:45:22.440732+00	20221201084001_merge	\N	\N	2022-12-02 14:45:22.336137+00	1
2bb7ee1d-71d7-4cac-9024-4b7b7a4ce98d	6cc8c7074c95d085dd2936c6e8b89d1a0c4dfa406e7c83240cb35ad12f69c928	2022-12-02 14:45:22.604904+00	20221201090037_init	\N	\N	2022-12-02 14:45:22.492984+00	1
929feec9-527e-4f81-81b3-c5f9b3ffbeaf	518addc0356479b6f161787858b325373bffb819880800f067fd92d9a1b6f13d	2022-12-02 14:45:22.732328+00	20221201090532_init	\N	\N	2022-12-02 14:45:22.652743+00	1
0ff6a5a7-c30b-4174-96b4-b403a4d5b010	dc3d5dad5344618daf0ad1ae39bcb9bfae82d1a775474f524eafce9cb3edbfaa	2022-12-03 09:04:07.368656+00	20221203090406_init	\N	\N	2022-12-03 09:04:07.253081+00	1
\.


--
-- Data for Name: _users_in_message_section; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._users_in_message_section ("A", "B") FROM stdin;
\.


--
-- Name: Accommodation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Accommodation_id_seq"', 2, true);


--
-- Name: MessageSection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MessageSection_id_seq"', 1, false);


--
-- Name: Message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Message_id_seq"', 1, false);


--
-- Name: RentRequest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RentRequest_id_seq"', 14, true);


--
-- Name: Room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Room_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 3, true);


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
-- Name: RentRequest RentRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RentRequest"
    ADD CONSTRAINT "RentRequest_pkey" PRIMARY KEY (id);


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
-- Name: Message_id_fromId_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Message_id_fromId_createdAt_idx" ON public."Message" USING btree (id, "fromId", "createdAt");


--
-- Name: Owner_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Owner_email_key" ON public."Owner" USING btree (email);


--
-- Name: Owner_phone_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Owner_phone_key" ON public."Owner" USING btree (phone);


--
-- Name: Owner_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Owner_userId_idx" ON public."Owner" USING btree ("userId");


--
-- Name: Owner_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Owner_userId_key" ON public."Owner" USING btree ("userId");


--
-- Name: RentRequest_renterId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "RentRequest_renterId_key" ON public."RentRequest" USING btree ("renterId");


--
-- Name: Renter_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Renter_email_key" ON public."Renter" USING btree (email);


--
-- Name: Renter_phone_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Renter_phone_key" ON public."Renter" USING btree (phone);


--
-- Name: Renter_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Renter_userId_idx" ON public."Renter" USING btree ("userId");


--
-- Name: Renter_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Renter_userId_key" ON public."Renter" USING btree ("userId");


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
-- Name: Room Room_accommodationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES public."Accommodation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


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

