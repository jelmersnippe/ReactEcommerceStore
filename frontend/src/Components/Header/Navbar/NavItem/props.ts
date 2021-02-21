export default interface Props {
    item: NavItem;
    level: number;
}

interface NavItem {
    title: string;
    slug: string;
    children?: Array<NavItem>;
}
