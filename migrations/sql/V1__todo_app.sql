CREATE TABLE public.users (
id bigserial not null primary key,
name text,
created_at timestamp with time zone not null default now(),
last_seen timestamp with time zone
);
CREATE TABLE public.todos (
id bigserial not null primary key,
title text,
is_completed boolean default false,
is_public boolean default false,
created_at timestamp with time zone not null default now(),
user_id bigint not null references public.users(id)
);