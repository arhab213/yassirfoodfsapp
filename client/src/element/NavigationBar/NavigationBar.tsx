import "./NavigationBar.css";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

function NavigationBar() {
  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="nav-bar-bar-item-container">
            <i
              className="fa-solid fa-chart-simple"
              style={{ color: "#000000" }}
            ></i>
            <div>Sales</div>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              month Sales
              <MenubarShortcut>⌘Y</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>week sales</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
}
export default NavigationBar;
