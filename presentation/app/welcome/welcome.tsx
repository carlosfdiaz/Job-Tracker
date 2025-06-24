import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { Accordion, AccordionItem } from "@heroui/react";
import Layout from '../components/SharedLayout';
import Home from '../routes/home';
import { Link } from "react-router";
import WorkSearchLog from "~/components/WorkSearchLog";

export function Welcome() {
  return (
    <WorkSearchLog />
  );
}

