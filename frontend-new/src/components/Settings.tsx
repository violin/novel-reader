import { Card, Slider, Select, Space, Typography } from 'antd';
import type { Settings } from '../types';

const { Title } = Typography;
const { Option } = Select;

interface SettingsProps {
  settings: Settings;
  onFontSizeChange: (size: number) => void;
  onFontFamilyChange: (family: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onToggleShortcuts: () => void;
}

export default function Settings({
  settings,
  onFontSizeChange,
  onFontFamilyChange,
  onBackgroundColorChange,
  onToggleShortcuts,
}: SettingsProps) {
  const fontFamilies = [
    'Arial, sans-serif',
    'Georgia, serif',
    'Courier New, monospace',
    'Times New Roman, serif',
  ];

  const backgroundColors = [
    { name: 'White', value: '#ffffff' },
    { name: 'Sepia', value: '#f4ecd8' },
    { name: 'Dark', value: '#1e1e1e' },
  ];

  return (
    <Card style={{ marginTop: '16px' }}>
      <Title level={4}>设置</Title>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <div>字体大小</div>
          <Slider
            min={12}
            max={24}
            value={settings.fontSize}
            onChange={onFontSizeChange}
          />
        </div>

        <div>
          <div>字体</div>
          <Select
            value={settings.fontFamily}
            style={{ width: '100%' }}
            onChange={onFontFamilyChange}
          >
            {fontFamilies.map((font) => (
              <Option key={font} value={font} style={{ fontFamily: font }}>
                {font.split(',')[0]}
              </Option>
            ))}
          </Select>
        </div>

        <div>
          <div>背景色</div>
          <Select
            value={settings.backgroundColor}
            style={{ width: '100%' }}
            onChange={onBackgroundColorChange}
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
      </Space>
      
      <div style={{ marginTop: '16px' }}>
        <button 
          onClick={onToggleShortcuts}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {settings.showKeyboardShortcuts ? 'Hide Keyboard Shortcuts' : 'Show Keyboard Shortcuts'}
        </button>
      </div>
    </Card>
  );
}
