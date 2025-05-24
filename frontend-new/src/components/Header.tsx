import { Layout, Button, Dropdown, Menu, Slider, Select, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import type { Settings } from '../types';


const { Header: AntHeader } = Layout;
const { Text } = Typography;
const { Option } = Select;

interface HeaderProps {
  settings: Settings;
  onFontSizeChange: (size: number) => void;
  onFontFamilyChange: (family: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onTextColorChange: (color: string) => void;
  onToggleShortcuts: () => void;
}

const fontFamilies = [
  'Arial, sans-serif',
  'Georgia, serif',
  'Courier New, monospace',
  'Times New Roman, serif',
];

const backgroundColors = [
  { name: '白色', value: '#ffffff' },
  { name: '护眼', value: '#f4ecd8' },
  { name: '深色', value: '#1e1e1e' },
];

const textColors = [
  { name: '黑色', value: '#000000' },
  { name: '白色', value: '#ffffff' },
  { name: '灰色', value: '#666666' },
  { name: '棕色', value: '#8B4513' },
  { name: '蓝色', value: '#0000ff' },
  { name: '红色', value: '#ff0000' },
  { name: '绿色', value: '#008000' },
];

export default function Header({ 
  settings, 
  onFontSizeChange, 
  onFontFamilyChange, 
  onBackgroundColorChange,
  onTextColorChange,
  onToggleShortcuts 
}: HeaderProps) {
  const menuItems: MenuProps['items'] = [
    {
      key: 'fontSize',
      label: (
        <div style={{ padding: '8px 12px' }} onClick={(e) => e.stopPropagation()}>
          <Text>字体大小</Text>
          <div onClick={(e) => e.stopPropagation()}>
            <Slider
              min={12}
              max={24}
              value={settings.fontSize}
              onChange={onFontSizeChange}
              style={{ width: '200px', marginTop: '8px' }}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'fontFamily',
      label: (
        <div style={{ padding: '8px 12px' }} onClick={(e) => e.stopPropagation()}>
          <Text>字体</Text>
          <div onClick={(e) => e.stopPropagation()}>
            <Select
              value={settings.fontFamily}
              style={{ width: '100%', marginTop: '8px' }}
              onChange={onFontFamilyChange}
              dropdownMatchSelectWidth={false}
              onClick={(e) => e.stopPropagation()}
              dropdownStyle={{ minWidth: '200px' }}
            >
              {fontFamilies.map((font) => (
                <Option key={font} value={font} style={{ fontFamily: font }}>
                  {font.split(',')[0]}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      ),
    },
    {
      key: 'backgroundColor',
      label: (
        <div style={{ padding: '8px 12px' }} onClick={(e) => e.stopPropagation()}>
          <Text>背景色</Text>
          <div onClick={(e) => e.stopPropagation()}>
            <Select
              value={settings.backgroundColor}
              style={{ width: '100%', marginTop: '8px' }}
              onChange={onBackgroundColorChange}
              dropdownMatchSelectWidth={false}
              onClick={(e) => e.stopPropagation()}
              dropdownStyle={{ minWidth: '200px' }}
            >
              {backgroundColors.map((color) => (
                <Option key={color.value} value={color.value}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: color.value,
                        marginRight: '8px',
                        border: '1px solid #d9d9d9',
                      }}
                    />
                    {color.name}
                  </div>
                </Option>
              ))}
            </Select>
          </div>
        </div>
      ),
    },
    {
      key: 'textColor',
      label: (
        <div style={{ padding: '8px 12px' }} onClick={(e) => e.stopPropagation()}>
          <Text>文字颜色</Text>
          <div onClick={(e) => e.stopPropagation()}>
            <Select
              value={settings.textColor}
              style={{ width: '100%', marginTop: '8px' }}
              onChange={onTextColorChange}
              dropdownMatchSelectWidth={false}
              onClick={(e) => e.stopPropagation()}
              dropdownStyle={{ minWidth: '200px' }}
            >
              {textColors.map((color) => (
                <Option key={color.value} value={color.value}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: color.value,
                        marginRight: '8px',
                        border: '1px solid #d9d9d9',
                      }}
                    />
                    {color.name}
                  </div>
                </Option>
              ))}
            </Select>
          </div>
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'shortcuts',
      label: (
        <div style={{ padding: '8px 12px' }} onClick={(e) => e.stopPropagation()}>
          <Button 
            type="text" 
            style={{ width: '100%', textAlign: 'left' }}
            onClick={onToggleShortcuts}
          >
            {settings.showKeyboardShortcuts ? '隐藏快捷键' : '显示快捷键'}
          </Button>
        </div>
      ),
    },
  ];

  const menu = <Menu items={menuItems} />;

  return (
    <AntHeader style={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      background: '#fff',
      boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)'
    }}>
      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Novel Reader</div>
      <div>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <Button type="text" icon={<SettingOutlined style={{ fontSize: '16px' }} />} />
        </Dropdown>
      </div>
    </AntHeader>
  );
}
