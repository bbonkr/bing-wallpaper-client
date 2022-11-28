export type AnchorTargets = string | '_blank' | '_slef';

export interface LinkModel {
    title: string;
    href: string;
    target?: AnchorTargets;
}
