import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { NotificationService } from './notificationServices';
import { ChannelFactory } from './channels/channelFactory';

// Mock the channel implementation
const mockChannel = {
  send: vi.fn(),
};

// Mock the ChannelFactory
vi.mock('./channels/channelFactory', () => ({
  ChannelFactory: {
    getChannel: vi.fn(),
  },
}));

// Mock console methods
const consoleSpy = {
  log: vi.spyOn(console, 'log'),
  error: vi.spyOn(console, 'error'),
};

describe('NotificationService', () => {
  let notificationService: NotificationService;

  beforeEach(() => {
    notificationService = new NotificationService();

    // Clear all mocks before each test
    vi.clearAllMocks();

    // Reset the mock implementation
    mockChannel.send.mockReset();
    (ChannelFactory.getChannel as Mock).mockReset();
  });

  it('should successfully send a notification', async () => {
    // Arrange
    const topic = 'test-topic';
    const message = 'test message';
    mockChannel.send.mockResolvedValue(undefined);
    (ChannelFactory.getChannel as Mock).mockReturnValue(mockChannel);

    // Act
    await notificationService.notify(topic, message);

    // Assert
    expect(ChannelFactory.getChannel).toHaveBeenCalledWith(topic);
    expect(mockChannel.send).toHaveBeenCalledWith(message);
    expect(consoleSpy.log).toHaveBeenCalledWith(
      `Message sent to ${topic} channel`
    );
  });

  it('should throw an error when channel send fails', async () => {
    // Arrange
    const topic = 'test-topic';
    const message = 'test message';
    const error = new Error('Send failed');
    mockChannel.send.mockRejectedValue(error);
    (ChannelFactory.getChannel as Mock).mockReturnValue(mockChannel);

    // Act & Assert
    await expect(notificationService.notify(topic, message)).rejects.toThrow(
      'Send failed'
    );

    expect(ChannelFactory.getChannel).toHaveBeenCalledWith(topic);
    expect(mockChannel.send).toHaveBeenCalledWith(message);
    expect(consoleSpy.error).toHaveBeenCalledWith(
      'Failed to send notification: Send failed'
    );
  });

  it('should throw an error when getChannel fails', async () => {
    // Arrange
    const topic = 'test-topic';
    const message = 'test message';
    const error = new Error('Invalid channel');
    (ChannelFactory.getChannel as Mock).mockImplementation(() => {
      throw error;
    });

    // Act & Assert
    await expect(notificationService.notify(topic, message)).rejects.toThrow(
      'Invalid channel'
    );

    expect(ChannelFactory.getChannel).toHaveBeenCalledWith(topic);
    expect(mockChannel.send).not.toHaveBeenCalled();
    expect(consoleSpy.error).toHaveBeenCalledWith(
      'Failed to send notification: Invalid channel'
    );
  });
});
