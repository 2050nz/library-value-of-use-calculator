import type LineItem from "./LineItem";

export default interface Config {
    headings: Array<String>,
    items: Array<LineItem>
}