import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Typography } from 'antd';
import type { RootState } from '../store';
import { toggleKeyboardShortcuts } from '../store/modules/settings';

const { Title, Paragraph } = Typography;

const KeyboardShortcuts = () => {
  const dispatch = useDispatch();
  const { showKeyboardShortcuts } = useSelector((state: RootState) => state.settings);
  const shortcuts = [
    { key: '→', description: '下一章' },
    { key: '←', description: '上一章' },
    { key: 'Space', description: '向下翻页' },
    { key: 'Shift + Space', description: '向上翻页' },
    { key: 'J', description: '向下滚动' },
    { key: 'K', description: '向上滚动' },
    { key: 'H', description: '向左滚动' },
    { key: 'L', description: '向右滚动' },
    { key: 'F', description: '全屏切换' },
    { key: 'Esc', description: '退出全屏/关闭快捷键帮助' },
    { key: '?', description: '显示/隐藏快捷键帮助' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle shortcuts help with '?'
      if (e.key === '?') {
        e.preventDefault();
        dispatch(toggleKeyboardShortcuts());
      }
      
      // Close with Escape
      if (e.key === 'Escape' && showKeyboardShortcuts) {
        dispatch(toggleKeyboardShortcuts());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, showKeyboardShortcuts]);

  return (
    <Modal
      title="键盘快捷键"
      open={showKeyboardShortcuts}
      onCancel={() => dispatch(toggleKeyboardShortcuts())}
      footer={null}
      width={600}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {shortcuts.map((shortcut, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{
              backgroundColor: '#f0f0f0',
              padding: '4px 8px',
              borderRadius: '4px',
              marginRight: '12px',
              fontFamily: 'monospace',
              minWidth: '80px',
              textAlign: 'center',
            }}>
              {shortcut.key}
            </div>
            <span>{shortcut.description}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default KeyboardShortcuts;
